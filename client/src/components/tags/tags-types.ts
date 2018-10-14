export interface TagsQuery {
  tags: Array<TagType>;
}

export interface TagType {
  name: TagValues;
  colour: TagColours;
}

enum TagValues {
  HOLIDAY,
  FOOD,
  TRAVEL,
  ENTERTAINMENT,
}

enum TagColours {
  GREEN,
  RED,
  BLUE,
}
