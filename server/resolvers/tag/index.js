const tags = [{
  name: 'HOLIDAY',
  colour: 'GREEN',
}, {
  name: 'ENTERTAINMENT',
  colour: 'BLUE',
}];


export const TagResolver = {
  tags() {
    return tags;
  },
  tag(_, { name }) {
    return tags.find(tag => tag.name === name);
  },
};
