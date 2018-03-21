const PersonResolver = {
  person() {
    return [{
      name: 'person 1',
    }];
  },
};

export const QueryResolvers = Object.assign({}, PersonResolver);
