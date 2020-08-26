# joi-validation-builder

`joi-validation-builder` is a library for constructing `joi` schemas from strings.

## Installation

```bash
npm install joi-validation-builder
```

## Usage

`buildAndValidate` helper function.

```js
const { buildAndValidate } = require('joi-validation-builder');

const schemaDescriptor = {
  firstName: 'string:min=1,max=80,required',
  lastName: 'string:min=1,max=80,required',
  emailAddress: 'string:email',
  website: 'string:uri',
  age: 'number:integer,min=18,label=YearsPast',
  favouriteBand: 'string:valid=[Pantera;Faith No More;Judas Priest;Manowar]',
  hobbies: 'array:items=(string:valid=[metalwork;woodwork;beer brewing;charcuterie;fly fishing;cycling]),min=3',
  birthday: 'date:greater=1-1-1986'
};

const input = {
  firstName: 'Alex',
  lastName: 'Coulcher',
  emailAddress: 'alex@polyglot.rodeo',
  website: 'http://polyglot.rodeo',
  age: 34,
  favouriteBand: 'Faith No More',
  hobbies: ['metalwork', 'woodwork', 'beer brewing', 'charcuterie', 'fly fishing'],
  birthday: '01-15-1986'
};

const result = buildAndValidate(schemaDescriptor, input,  { abortEarly: false });
console.log(`Any Errors? ${result.error || 'nope'}\n\n`);
```

`ValidationBuilder` class.
```js
const { ValidationBuilder } = require('joi-validation-builder');

const validationBuilder = new ValidationBuilder();
const schema = validationBuilder.build(schemaDescriptor);
const { error } = schema.validate(input, { abortEarly: false });

console.log(error);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
