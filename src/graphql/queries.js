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

export const getQuestions = `query GetCheckInQuestions($id: ID!) {
  getQuestions {
    uuid
    questionNo
    questionDescription
    answerValue
    answerOption
    Response

  }
}
`;
export const listCheckInQuestions = `query ListCheckInQuestions(
  $filter: TableCheckInQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listCheckInQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      uuid
      questionNo
      questionDescription
      answerValue
      answerOption
      Response
  
    }
    nextToken
  }
}
`;
export const getMyCustomType = `query GetMyCustomType($id: ID!) {
  getMyCustomType {
    uuid
    questionNo
    answerValue
    answerDate

  }
}
`;
export const listMyCustomTypes = `query ListMyCustomTypes(
  $filter: TableMyCustomTypeFilterInput
  $limit: Int
  $nextToken: String
) {
  listMyCustomTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      uuid
      questionNo
      answerValue
      answerDate
  
    }
    nextToken
  }
}
`;