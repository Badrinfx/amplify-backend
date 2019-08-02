// eslint-disable
// this is an auto generated file. This will be overwritten

export const createDreams = `mutation CreateDreams($input: CreateDreamsInput!) {
  createDreams(input: $input) {
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
export const updateDreams = `mutation UpdateDreams($input: UpdateDreamsInput!) {
  updateDreams(input: $input) {
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
export const deleteDreams = `mutation DeleteDreams($input: DeleteDreamsInput!) {
  deleteDreams(input: $input) {
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

export const createCheckInQuestions = `mutation CreateCheckInQuestions($input: CreateCheckInQuestionsInput!) {
  createCheckInQuestions(input: $input) {
    uuid
    questionNo
    questionDescription
    answerValue
    answerOption
    Response

  }
}
`;
export const updateCheckInQuestions = `mutation UpdateCheckInQuestions($input: UpdateCheckInQuestionsInput!) {
  updateCheckInQuestions(input: $input) {
    uuid
    questionNo
    questionDescription
    answerValue
    answerOption
    Response
}
}
`;
export const deleteCheckInQuestions = `mutation DeleteCheckInQuestions($input: DeleteCheckInQuestionsInput!) {
  deleteCheckInQuestions(input: $input) {
    uuid
    questionNo
    questionDescription
    answerValue
    answerOption
    Response
}
}
`;
export const CreateMyCustomTypeInput = `mutation CreateMyCustomTypeInput($input: CreateMyCustomTypeInput!) {
  createMyCustomTypeInput(input: $input) {
    uuid
    questionNo
    answerValue
    answerDate

  }
}
`;
export const updateMyCustomTypeInput = `mutation UpdateMyCustomTypeInput($input:UpdateMyCustomTypeInput!) {
  updateMyCustomTypeInput(input: $input) {
    uuid
    questionNo
    answerValue
    answerDate
}
}
`;
export const deleteMyCustomTypeInput = `mutation DeleteMyCustomTypeInput($input: DeleteMyCustomTypeInput!) {
  deleteMyCustomTypeInput(input: $input) {
    uuid
    questionNo
    answerValue
    answerDate
}
}
`;