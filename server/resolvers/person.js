const persons = [
  {
    name: 'person 1',
    email: 'person@person.uk',
  },
  {
    name: 'person 2',
    email: 'person2@person.uk',
  },
];

export const PersonResolver = {
  persons() {
    return persons;
  },
  person(_, { email }) {
    return persons.find(person => person.email === email);
  },
};
