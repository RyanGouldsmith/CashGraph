export const AllowedTagName = `
  enum AllowedTagName {
    HOLIDAY
    FOOD
    TRAVEL
    ENTERTAINMENT
  }
`;

export const AllowedColour = `
  enum AllowedColour {
    GREEN
    RED
    BLUE
  }
`;

export const Tag = `
  type Tag {
    name: AllowedTagName,
    colour: AllowedColour
  }
`;

export const TagInput = `
  input TagInput {
    name: AllowedTagName,
    colour: AllowedColour
  }
`;
