"use strict";
import { faker } from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(`SELECT id from "Users";`);
  const userRows = users[0];

  const posts = await queryInterface.sequelize.query(`SELECT id from "Posts";`);
  const postRows = posts[0];

  const comments = [];

  for (let i = 0; i < 50; i++) {
    const randomUser = faker.helpers.arrayElement(userRows);
    const randomPost = faker.helpers.arrayElement(postRows);

    comments.push({
      userId: randomUser.id,
      postId: randomPost.id,
      content: faker.lorem.sentences(faker.number.int({ min: 1, max: 5 })),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert("Comments", comments, {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Comments", null, {});
}
