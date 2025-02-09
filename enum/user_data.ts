import { contentType, language, service, theme } from "@enum/enum_order";
import * as interfaces_base from "@interfaces/interfaces_base";

export const cardDetails: interfaces_base.cardDetails = {
  CCNumber: "4263982640269299",
  exDate: "02/2026",
  CVV: "837",
  fullName: "John Wick",
};

export const draftDetails: interfaces_base.draftDetails = {
  contentType: contentType.powerPointPresentation,
  service: service.writing,
  language: language.englishUS,
  size: "5",
  period: 14,
  topicText: "PIONTKOVSKYI TASK",
  theme: theme.english,
  requirements: "Test Requirements",
  price: "50",
};
