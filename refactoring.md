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

O que devemos fazer é encapsular esses objetos que são usados em `declarations.push` dentro de cada `if` dessa forma:

```js
const horizontalValues = [
  { type: "left",
    declarations: {
      type: 'declaration',
      property: 'justify-content',
      value: 'flex-start'
    }
  },
  { type: "right",
    declarations: {
      type: 'declaration',
      property: 'justify-content',
      value: 'flex-end'
    }
  },
  { type: "center",
    declarations: {
      type: 'declaration',
      property: 'justify-content',
      value: propertyHorizontal
    }
  }
]
const verticalValues = [
  { type: "top",
    declarations: {
      type: 'declaration',
      property: 'align-items',
      value: 'flex-start'
    }
  },
  { type: "bottom",
    declarations: {
      type: 'declaration',
      property: 'align-items',
      value: 'flex-end'
    }
  },
  { type: "center",
    declarations: {
      type: 'declaration',
      property: 'align-items',
      value: propertyVertical
    }
  }
]
```

Ok! Agora nós vamos **iterar** nesse *Array* para automatizar os testes que tinham antes ficando assim:

```js
const testHorizontal = (element, index) => {
  if (element.type === propertyHorizontal) declarations.push(element.declarations)
}
const testVertical = (element, index) => {
  if (element.type === propertyVertical) declarations.push(element.declarations)
}
horizontalValues.forEach(testHorizontal)
verticalValues.forEach(testVertical)
}
```

Perceba que eu separei as funções executadas no `forEach` para facilitar a leitura e manutenção.

Agora vamos juntar tudo deixando nosso código assim:

```js
const getParam = require('./getParam.js');

let bnnAlign = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-align") {

      // Delete a custom property
      declarations.splice(index, 1)

      //Filter values
      const propertyHorizontal = getParam(declaration.value, 0)
      const propertyVertical = getParam(declaration.value, 1)

      const horizontalValues = [
        { type: "left",
          declarations: {
            type: 'declaration',
            property: 'justify-content',
            value: 'flex-start'
          }
        },
        { type: "right",
          declarations: {
            type: 'declaration',
            property: 'justify-content',
            value: 'flex-end'
          }
        },
        { type: "center",
          declarations: {
            type: 'declaration',
            property: 'justify-content',
            value: propertyHorizontal
          }
        }
      ]
      const verticalValues = [
        { type: "top",
          declarations: {
            type: 'declaration',
            property: 'align-items',
            value: 'flex-start'
          }
        },
        { type: "bottom",
          declarations: {
            type: 'declaration',
            property: 'align-items',
            value: 'flex-end'
          }
        },
        { type: "center",
          declarations: {
            type: 'declaration',
            property: 'align-items',
            value: propertyVertical
          }
        }
      ]
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

      const testHorizontal = (element, index) => {
        if (element.type === propertyHorizontal) declarations.push(element.declarations)
      }
      const testVertical = (element, index) => {
        if (element.type === propertyVertical) declarations.push(element.declarations)
      }
      horizontalValues.forEach(testHorizontal)
      verticalValues.forEach(testVertical)
    }
  });

};

module.exports = bnnAlign;
```

E se quisermos também podemos modularizar esses objetos: `horizontalValues` e `verticalValues`. Porém por hora deixaremos assim.

## Refatoração dos testes

Agora sim chegamos numa parte importante, pois olhe como está o arquivo de teste:

```js
const assert = require('assert'),
      css    = require('css');

// ---------------------------------
// render()
// ---------------------------------

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

// ---------------------------------
// bnnSize()
// ---------------------------------

describe('bnnSize()', () => {

  const bnnSize = require('../src/bnnSize.js');

  // bnnSize() test 1
  it("Should return a width and height with one specific value.", () => {

    let ast = css.parse(".a{bnn-size: 10px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  width: 10px;\n  height: 10px;\n}";

    assert.equal(result, expect);
  });

  // bnnSize() test 2
  it("Should return a width and height with two specific values.", () => {

    let ast = css.parse(".a{bnn-size: 10px 50px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  width: 10px;\n  height: 50px;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// bnnPosition()
// ---------------------------------

describe('bnnPosition()', () => {

  const bnnPosition = require('../src/bnnPosition.js');

  // bnnPosition() test 1
  it("Should return a top,right,bottom and left with four specific value.", () => {

    let ast = css.parse(".a{bnn-position: 10px 20px 30px 40px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  top: 10px;\n  right: 20px;\n  bottom: 30px;\n  left: 40px;\n}";

    assert.equal(result, expect);
  });

  // bnnPosition() test 2
  it("Should return a top,right,bottom and left with one specific value.", () => {

    let ast = css.parse(".a{bnn-position: 10px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  top: 10px;\n  right: 10px;\n  bottom: 10px;\n  left: 10px;\n}";

    assert.equal(result, expect);
  });

  // bnnPosition() test 3
  it("If the value is center, should return a block centered element", () => {

    let ast = css.parse(".a{bnn-position: center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// bnnGradient()
// ---------------------------------

describe('bnnGradient()', () => {

  const bnnGradient = require('../src/bnnGradient.js');

  // bnnGradient() test 1
  it("Should return a gradient with two colors.", () => {

    let ast = css.parse(".a{bnn-gradient: red yellow;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  background-image: linear-gradient(to bottom, red, yellow);\n}";

    assert.equal(result, expect);
  });

  // bnnGradient() test 2
  it("If the third value is vertical, should return a to bottom gradient.", () => {

    let ast = css.parse(".a{bnn-gradient: red yellow vertical;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  background-image: linear-gradient(to bottom, red, yellow);\n}";

    assert.equal(result, expect);
  });

  // bnnGradient() test 3
  it("If the third value is hotizontal, should return a to left gradient.", () => {

    let ast = css.parse(".a{bnn-gradient: red yellow horizontal;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  background-image: linear-gradient(to left, red, yellow);\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// bnnAlign()
// ---------------------------------

describe('bnnAlign()', () => {

  const bnnAlign = require('../src/bnnAlign.js');

  // bnnAlign() test 1
  it("Should return a vertical and horizontal centralized flex container with one value", () => {

    let ast = css.parse(".a{bnn-align: center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 2
  it("Should return a vertical and horizontal centralized flex container with two values", () => {

    let ast = css.parse(".a{bnn-align: center center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 3
  it("Should return a flex container aligned to left with one value", () => {

    let ast = css.parse(".a{bnn-align: left;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 4
  it("Should return a flex container aligned to right with one value", () => {

    let ast = css.parse(".a{bnn-align: right;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}";
    assert.equal(result, expect);
  });

  // bnnAlign() test 5
  it("Should return a flex container, with the content to top with one value", () => {

    let ast = css.parse(".a{bnn-align: top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 6
  it("Should return a flex container, with the content to bottom with one value", () => {

    let ast = css.parse(".a{bnn-align: bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 7
  it("Should return a flex container, with the content to left and top", () => {

    let ast = css.parse(".a{bnn-align: left top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 9
  it("Should return a flex container, with the content to left and bottom", () => {

    let ast = css.parse(".a{bnn-align: left bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 10
  it("Should return a flex container, with the content to right and top", () => {

    let ast = css.parse(".a{bnn-align: right top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 11
  it("Should return a flex container, with the content to right and bottom", () => {

    let ast = css.parse(".a{bnn-align: right bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 12
  it("Should return a flex container, with the content to center and bottom", () => {

    let ast = css.parse(".a{bnn-align: center bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 13
  it("Should return a flex container, with the content to right and center", () => {

    let ast = css.parse(".a{bnn-align: right center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// bnnImport()
// ---------------------------------

describe('bnnImport()', () => {

  const bnnImport = require('../src/bnnImport.js');

  // bnnImport() test 1
  it("Should return the modulo.bnn file imported into the main.bnn file", () => {

    let ast = css.parse("@import fixtures/module.bnn; .a{width: 500px;}");

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.import) bnnImport("test/main.bnn", rule.import, ast.stylesheet.rules, index);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  width: 500px;\n}\n\n.b {\n  color: #000;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// getParam()
// ---------------------------------

describe('getParam()', () => {

  const getParam = require('../src/getParam.js');

  // getParam() test 1
  it("Should return a specific value of a shorthand.", () => {
    let result = getParam("10px 20px 30px 40px", 2);
    let expect = "30px";

    assert.equal(result, expect);
  });

  // getParam() test 2
  it("If dont exist the especific value, should return the first value of a shorthand.", () => {
    let result = getParam("30px 10px", 3);
    let expect = "30px";

    assert.equal(result, expect);
  });

});
```

> **POOOOOORRRRAA VAI TOMAR NO CU!!!**

E você sabe porque esse código está ruim, não está errado, só está ruim?

Bom então pense aqui comigo:

Para eu rodar os testes executamos `npm test`:

```
(bananacss) ➜ (git:(master) ✗) ➜ npm test

> bananacss@0.2.0 test /Users/jeancarlonascimento/www/testes/bananacss
> mocha


  render()
    ✓ should return the fully rendered css

  bnnSize()
    ✓ Should return a width and height with one specific value.
    ✓ Should return a width and height with two specific values.

  bnnPosition()
    ✓ Should return a top,right,bottom and left with four specific value.
    ✓ Should return a top,right,bottom and left with one specific value.
    ✓ If the value is center, should return a block centered element

  bnnGradient()
    ✓ Should return a gradient with two colors.
    ✓ If the third value is vertical, should return a to bottom gradient.
    ✓ If the third value is hotizontal, should return a to left gradient.

  bnnAlign()
    ✓ Should return a vertical and horizontal centralized flex container with one value
    ✓ Should return a vertical and horizontal centralized flex container with two values
    ✓ Should return a flex container aligned to left with one value
    ✓ Should return a flex container aligned to right with one value
    ✓ Should return a flex container, with the content to top with one value
    ✓ Should return a flex container, with the content to bottom with one value
    ✓ Should return a flex container, with the content to left and top
    ✓ Should return a flex container, with the content to left and bottom
    ✓ Should return a flex container, with the content to right and top
    ✓ Should return a flex container, with the content to right and bottom
    ✓ Should return a flex container, with the content to center and bottom
    ✓ Should return a flex container, with the content to right and center

  bnnImport()
    ✓ Should return the modulo.bnn file imported into the main.bnn file

  getParam()
    ✓ Should return a specific value of a shorthand.
    ✓ If dont exist the especific value, should return the first value of a shorthand.


  24 passing (36ms)
```

Agora eu lhe pergunto:

> Como faço para executar **APENAS** o teste `bnnAlign()`?

Se você não sabe eu te respondo:

> **Não faz!**

Então o que devemos fazer?

> MODULARIZAR ESSA PORRAAAA!

O jeito mais fácil é retirarmos todo o conteúdo de `describe('bnnAlign()'` e salvar em um arquivo chamado `test/bnnAlign.test.js`:

```js
const assert = require('assert'),
      css    = require('css');

// ---------------------------------
// bnnAlign()
// ---------------------------------

describe('bnnAlign()', () => {

  const bnnAlign = require('../src/bnnAlign.js');

  // bnnAlign() test 1
  it("Should return a vertical and horizontal centralized flex container with one value", () => {

    let ast = css.parse(".a{bnn-align: center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 2
  it("Should return a vertical and horizontal centralized flex container with two values", () => {

    let ast = css.parse(".a{bnn-align: center center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 3
  it("Should return a flex container aligned to left with one value", () => {

    let ast = css.parse(".a{bnn-align: left;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 4
  it("Should return a flex container aligned to right with one value", () => {

    let ast = css.parse(".a{bnn-align: right;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}";
    assert.equal(result, expect);
  });

  // bnnAlign() test 5
  it("Should return a flex container, with the content to top with one value", () => {

    let ast = css.parse(".a{bnn-align: top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 6
  it("Should return a flex container, with the content to bottom with one value", () => {

    let ast = css.parse(".a{bnn-align: bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 7
  it("Should return a flex container, with the content to left and top", () => {

    let ast = css.parse(".a{bnn-align: left top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 9
  it("Should return a flex container, with the content to left and bottom", () => {

    let ast = css.parse(".a{bnn-align: left bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 10
  it("Should return a flex container, with the content to right and top", () => {

    let ast = css.parse(".a{bnn-align: right top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 11
  it("Should return a flex container, with the content to right and bottom", () => {

    let ast = css.parse(".a{bnn-align: right bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 12
  it("Should return a flex container, with the content to center and bottom", () => {

    let ast = css.parse(".a{bnn-align: center bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 13
  it("Should return a flex container, with the content to right and center", () => {

    let ast = css.parse(".a{bnn-align: right center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

});

```

Fazendo isso já conseguimos chamar apenas esse teste com `mocha test/bnnAlign.test.js `:

```
(bananacss) ➜ (git:(master)) ➜ mocha test/bnnAlign.test.js


  bnnAlign()
    ✓ Should return a vertical and horizontal centralized flex container with one value
    ✓ Should return a vertical and horizontal centralized flex container with two values
    ✓ Should return a flex container aligned to left with one value
    ✓ Should return a flex container aligned to right with one value
    ✓ Should return a flex container, with the content to top with one value
    ✓ Should return a flex container, with the content to bottom with one value
    ✓ Should return a flex container, with the content to left and top
    ✓ Should return a flex container, with the content to left and bottom
    ✓ Should return a flex container, with the content to right and top
    ✓ Should return a flex container, with the content to right and bottom
    ✓ Should return a flex container, with the content to center and bottom
    ✓ Should return a flex container, with the content to right and center


  12 passing (25ms)

```

**Fácil não?**

> É mas como que fica o arquivo de testes principal? Pois agora ele está sem aquele teste.

**Baaaahhh isso é muito simples!**

Como separamos o código e apenas precisamos executar ele podemos colocar apenas essa linha no local de **TODO AQUELE CÓDIGO**:

```js
require('./bnnAlign.test.js')
```

E agora podemos executar os testes como antes com `npm test` além de pode executar apenas 1 teste, bem melhor não?

```

(bananacss) ➜ (git:(master) ✗) ➜ npm test

> bananacss@0.2.0 test /Users/jeancarlonascimento/www/testes/bananacss
> mocha


  bnnAlign()
    ✓ Should return a vertical and horizontal centralized flex container with one value
    ✓ Should return a vertical and horizontal centralized flex container with two values
    ✓ Should return a flex container aligned to left with one value
    ✓ Should return a flex container aligned to right with one value
    ✓ Should return a flex container, with the content to top with one value
    ✓ Should return a flex container, with the content to bottom with one value
    ✓ Should return a flex container, with the content to left and top
    ✓ Should return a flex container, with the content to left and bottom
    ✓ Should return a flex container, with the content to right and top
    ✓ Should return a flex container, with the content to right and bottom
    ✓ Should return a flex container, with the content to center and bottom
    ✓ Should return a flex container, with the content to right and center

  render()
    ✓ should return the fully rendered css

  bnnSize()
    ✓ Should return a width and height with one specific value.
    ✓ Should return a width and height with two specific values.

  bnnPosition()
    ✓ Should return a top,right,bottom and left with four specific value.
    ✓ Should return a top,right,bottom and left with one specific value.
    ✓ If the value is center, should return a block centered element

  bnnGradient()
    ✓ Should return a gradient with two colors.
    ✓ If the third value is vertical, should return a to bottom gradient.
    ✓ If the third value is hotizontal, should return a to left gradient.

  bnnImport()
    ✓ Should return the modulo.bnn file imported into the main.bnn file

  getParam()
    ✓ Should return a specific value of a shorthand.
    ✓ If dont exist the especific value, should return the first value of a shorthand.


  24 passing (37ms)
```
