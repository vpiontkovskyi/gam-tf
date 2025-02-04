import { category, language, theme, title } from "@enum/enum_order";

export const paymentDetails = {
  "John Wick": {
    cardNumber: "4263982640269299",
    expiry: "02/2026",
    cvv: "837",
    cardHolder: "John Wick",
  },
};

export const orderDetails = [
  {
    title: title.powerPointPresentation,
    category: category.writing,
    language: language.englishUS,
    pages: "5",
    deadlineDays: 14,
    taskName: "PIONTKOVSKYI ",
    theme: theme.english,
    requirements: "Test Requirements",
    price: "50",
  },
  {
    title: title.powerPointPresentation,
    category: category.editing,
    language: language.englishUS,
    pages: "3",
    deadlineDays: 7,
    taskName: "PIONTKOVSKYI ",
    theme: theme.english,
    requirements: "Test Requirements",
    price: "30",
  },
];
