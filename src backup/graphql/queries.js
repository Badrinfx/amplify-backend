// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDreams = `query GetDreams($id: ID!) {
  getDreams(id: $id) {
    id
    dreamid
    dreamtitle
    dreamdescription
    wokeupfeeling
    City
    Country
    State
    Category
    Date
    dreamprivacy
  }
}
`;
export const listDreamss = `query ListDreamss(
  $filter: ModeldreamsFilterInput
  $limit: Int
  $nextToken: String
) {
  listDreamss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      dreamid
      dreamtitle
      dreamdescription
      wokeupfeeling
      City
      Country
      State
      Category
      Date
      dreamprivacy
    }
    nextToken
  }
}
`;
