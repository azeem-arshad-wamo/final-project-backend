"use strict";
import { faker } from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = [];

  for (let i = 0; i < 40; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password_hash: faker.internet.password(10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert("Users", users, {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Users", null, {});
}
