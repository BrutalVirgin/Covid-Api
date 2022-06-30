let data = require("../../states.json");

export function stateValidation(state: string) {
  let statesArray: string[] = [];

  for (let element of data) {
    statesArray.push(element.state);
  }

  const condition = (element: string) => element === state;

  return statesArray.some(condition);
}
