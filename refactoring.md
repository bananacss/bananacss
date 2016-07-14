# Refatorando


Vamo começar analisando o arquivo principal `src/banana.js`:

```js
'use strict';

const css         = require('css'),
      bnnSize     = require('./bnnSize.js'),
      bnnPosition = require('./bnnPosition.js'),
      bnnGradient = require('./bnnGradient.js'),
      bnnImport    = require('./bnnImport.js'),
      bnnAlign    = require('./bnnAlign.js');

function Banana() {

  this.render = (inputPath, stylesheet) => {

    // Create the AST Tree
    let ast = css.parse(stylesheet);

    // Search for import rules
    ast.stylesheet.rules.forEach((rule, index) => {
      // Verifies that the rule is a import
      if (rule.import) {
        // Import the module
        bnnImport(inputPath, rule.import, ast.stylesheet.rules, index);
      }
    });

    // Search for selectors rules
    ast.stylesheet.rules.forEach((rule) => {
      // Verifies that the rule is a selector
      if (rule.selectors) {
        // Get custom declarations and create new declarations
        bnnSize(rule.declarations);
        bnnPosition(rule.declarations);
        bnnGradient(rule.declarations);
        bnnAlign(rule.declarations);
      }
    });

    // Return the stringify AST
    return css.stringify(ast);

  };

}

module.exports = new Banana();
```

A primeira coisa que notei é que temos a iportação de outros módulos como:

- bnnSize
- bnnPosition
- bnnGradient
- bnnImport
- bnnAlign

Correto?

Então perceba que dessa forma as configurações serão sempre definidas e nunca INJETADAS na função principal `Banana`, se não injetamos esses valores então estamos usando-os como GLOBAIS e isso é **ruim**.

> Então o que devemos fazer???

Simples! Criar 1 objeto de configuração com esses módulos e depois injetar ele em `Banana()`, ficando assim:

```js
'use strict';

const css = require('css')

function Banana(config) {
...
```

> Ué Suissa mas vc tá loco? De onde vem esse `config`?

**Então meu caro gafanhoto! Ele deverá vir do arquivo que está chamando o `Banana`, por exemplo vamos criar o `index.js`:


```js
const config = {};
config.bnnSize = require('./bnnSize.js'),
config.bnnPosition = require('./bnnPosition.js'),
config.bnnGradient = require('./bnnGradient.js'),
config.bnnImport = require('./bnnImport.js'),
config.bnnAlign = require('./bnnAlign.js');

const Banana = require('./banana.js');
Banana.run(config);
```

Percebeu então que separamos o módulo que executa das suas configurações?

Bom acredito que você percebeu essa função `run(config)` né?!

Eu refatorei essa parte pois ela estava assim:

```js
module.exports = new Banana();
```

E, **na minha opinião**, isso é BEM errado pois você esta exportando apenas a instância da função `Banana`, mas e se eu quiser passar parâmetros para essa função, como por exemplo diferentes configurações?

> Já estaria na merda!

Por isso o mais correto seria assim: `module.exports = Banana;`

Porém como ela é uma função e esse módulo poderá ter mais funções que apenas o `render`, eu prefiro fazer dessa forma:

```js
'use strict';

const css = require('css')

const Banana = (config) => {
  return {
    render: (inputPath, stylesheet) => {
      // Create the AST Tree
      let ast = css.parse(stylesheet);

      // Search for import rules
      ast.stylesheet.rules.forEach((rule, index) => {
        // Verifies that the rule is a import
        if (rule.import) {
          // Import the module
          bnnImport(inputPath, rule.import, ast.stylesheet.rules, index);
        }
      });

      // Search for selectors rules
      ast.stylesheet.rules.forEach((rule) => {
        // Verifies that the rule is a selector
        if (rule.selectors) {
          // Get custom declarations and create new declarations
          config.bnnSize(rule.declarations);
          config.bnnPosition(rule.declarations);
          config.bnnGradient(rule.declarations);
          config.bnnAlign(rule.declarations);
        }
      });
      // Return the stringify AST
      return css.stringify(ast);
    }
  }
}

module.exports = { run: Banana };
```

Então nesse caso nós podemos apenas importar o módulo sem executá-lo e só após ter sua instância, com isso reusando em outras partes do código, executando a função `run` passando as configurações necessárias.

Com isso você pode rodar no mesmo código diferentes configurações usando o mesmo módulo.

Se nós refatoramos o código e mudamos sua estrutura então precisamos refatorar o teste também, `test/index.js` estava assim:

```js
describe('render()', () => {

  const banana = require('../src/banana.js');

  // render() test 1
  it("should return the fully rendered css", () => {
    let stylesheet = ".a {color:#000;bnn-size: 50px 100px;}.b {color:#000;bnn-position: 10px 5px 8px 90px;margin: 10px;}";

    let result = banana.render("teste.bnn", stylesheet);
    let expect = ".a {\n  color: #000;\n  width: 50px;\n  height: 100px;\n}\n\n.b {\n  color: #000;\n  margin: 10px;\n  top: 10px;\n  right: 5px;\n  bottom: 8px;\n  left: 90px;\n}";

    assert.equal(result, expect);
  });

});
```

Porém agora nosso módulo `banana` precisa executar a função `run` com suas configurações, logo vamos deixar o código assim:

```js
describe('render()', () => {

  const config = {};
  config.bnnSize = require('../src/bnnSize.js'),
  config.bnnPosition = require('../src/bnnPosition.js'),
  config.bnnGradient = require('../src/bnnGradient.js'),
  config.bnnImport = require('../src/bnnImport.js'),
  config.bnnAlign = require('../src/bnnAlign.js');

  const banana = require('../src/banana.js');
  // render() test 1
  it("should return the fully rendered css", () => {
    const stylesheet = ".a {color:#000;bnn-size: 50px 100px;}.b {color:#000;bnn-position: 10px 5px 8px 90px;margin: 10px;}";
    const result = banana.run(config).render("teste.bnn", stylesheet);
    const expect = ".a {\n  color: #000;\n  width: 50px;\n  height: 100px;\n}\n\n.b {\n  color: #000;\n  margin: 10px;\n  top: 10px;\n  right: 5px;\n  bottom: 8px;\n  left: 90px;\n}";

    assert.equal(result, expect);
  });

});
```

Percebeu que troquei os `let` dele por `const`?

> Sabe porquê?

Simplesmente porque ele só é definido 1 vez, logo não há porque usar `let`. deveos usar `let` apenas em variáveis que mudarão o seu valor, o que não é esse caso.

Bom esse foi 1 exemplo bem simples que fiz pra ensinar meu broder Afonsinho!

Ótimo agora podemos ir para os outros arquivos, por exemplo `src/bnnAlign`:

```js
const getParam = require('./getParam.js');

let bnnAlign = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-align") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let propertyValue1 = getParam(declaration.value, 0);
      let propertyValue2 = getParam(declaration.value, 1);

      // Add properties and values
      declarations.push({
        type: 'declaration',
        property: 'display',
        value: "flex"
      });

      declarations.push({
        type: 'declaration',
        property: 'flex-wrap',
        value: "wrap"
      });

      // verify the first value
      if (propertyValue1 === "left") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-start'
        });
      }

      if (propertyValue1 === "right") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-end'
        });
      }

      if (propertyValue1 === "center") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: propertyValue1
        });
      }

      // verify the property with second value
      if (propertyValue2 === "top") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-start'
        });
      }

      if (propertyValue2 === "bottom") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-end'
        });
      }

      if (propertyValue2 === "center") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: propertyValue2
        });
      }

    }

  });

};

module.exports = bnnAlign;
```

> O que você acha que poderia melhorar nesse código?

**Nada?!**

Pois olhe o que eu faria, percebeu que temos vários `if`s para testar `propertyValue1` e `propertyValue2`?

O `propertyValue1` é testado para:

- left
- right
- center

E `propertyValue2` é testado para:

- top
- bottom
- center

Logo sabendo disso podemos inferir que `propertyValue1` é para o **horizontal** e o `propertyValue2` para o **vertical**, certo?

> Como assim Suissa?

**Uai simples!** O `propertyValue1` aceita `left` e `right` e o `propertyValue2` aceita `top` e `bottom, além do `center` para os dois.

Então ficou claro para que serve cada uma não!?

Sabendo disso vamos renomerar essas variáveis para:

```js
let propertyHorizontal = getParam(declaration.value, 0);
let propertyVertical = getParam(declaration.value, 1);
```

Agora nosso código ficou mais fácil de ser entendido:

```js
const getParam = require('./getParam.js');

let bnnAlign = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-align") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let propertyHorizontal = getParam(declaration.value, 0);
      let propertyVertical = getParam(declaration.value, 1);

      // Add properties and values
      declarations.push({
        type: 'declaration',
        property: 'display',
        value: "flex"
      });

      declarations.push({
        type: 'declaration',
        property: 'flex-wrap',
        value: "wrap"
      });

      // verify the first value
      if (propertyHorizontal === "left") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-start'
        });
      }

      if (propertyHorizontal === "right") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-end'
        });
      }

      if (propertyHorizontal === "center") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: propertyHorizontal
        });
      }

      // verify the property with second value
      if (propertyVertical === "top") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-start'
        });
      }

      if (propertyVertical === "bottom") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-end'
        });
      }

      if (propertyVertical === "center") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: propertyVertical
        });
      }
    }
  });
};

module.exports = bnnAlign;
```

Agora vamos tentar **automatizar** esses testes!

O que devemos fazer é encapsular esses objetos que são usados em `declarations.push` dentro de cada `if`.




## Refatoração dos testes
