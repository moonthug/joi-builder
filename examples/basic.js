const { buildAndValidate, ValidationBuilder} = require('../dist');

const input = {
  firstName: 'Alex',
  lastName: 'Coulcher',
  emailAddress: 'alex@polyglot.rodeo',
  website: 'http://polyglot.rodeo',
  age: 34,
  favouriteBand: 'Faith No More',
  hobbies: ['metalwork', 'woodwork', 'beer brewing', 'charcuterie', 'fly fishing'],
  birthday: '04-15-1986',
  anyNumber: 9
};

const badInput = {
  firstName: 'Hal',
  lastName: 9000,
  emailAddress: 'hal@space',
  website: 'http://barsoom.project',
  age: 1,
  favouriteBand: 'Aqua',
  hobbies: ['none', 9000],
  birthday: '1-1-1970',
  anyNumber: 'not a number'
};

const schemaDescriptor = {
  firstName: 'string:min=1,max=80,required',
  lastName: 'string:min=1,max=80,required',
  emailAddress: 'string:email',
  website: 'string:uri',
  age: 'number:integer,min=18,label=YearsPast',
  favouriteBand: 'string:valid=[Pantera;Faith No More;Judas Priest;Manowar]',
  hobbies: 'array:items=(string:valid=[metalwork;woodwork;beer brewing;charcuterie;fly fishing]),min=3',
  birthday: 'date:greater=1-1-1986',
  anyNumber: 'number'
};

const result = buildAndValidate(schemaDescriptor, input,  { abortEarly: false });
console.log(`Any Errors? ${result.error || 'nope'}\n\n`);

const validationBuilder = new ValidationBuilder();
const schema = validationBuilder.build(schemaDescriptor);
const { error } = schema.validate(badInput, { abortEarly: false });
console.log(error);
