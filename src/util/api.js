import axios from "axios";

const host = "http://localhost:8088/api";
export async function fetchCards() {
  return axios({ method: "get", url: `${host}/cards` }).then(response => {
    return { cards: response.data };
  });
}

export async function addCards(card) {
  return axios({ method: "post", url: `${host}/cards`, data: card }).then(
    response => {
      return response.data;
    }
  );
}
// copied from  https://www.geeksforgeeks.org/luhn-algorithm/
export const luhnCheck = num => {
  let arr = (num + "")
    .split("")
    .reverse()
    .map(x => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};
