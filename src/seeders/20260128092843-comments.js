"use strict";
import { faker } from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(`SELECT id FROM "Users";`);
  const userRows = users[0];

  const posts = await queryInterface.sequelize.query(`SELECT id FROM "Posts";`);
  const postRows = posts[0];

  const comments = [];

  for (const post of postRows) {
    const numberOfComments = faker.number.int({ min: 1, max: 5 });

    for (let i = 0; i < numberOfComments; i++) {
      const randomUser = faker.helpers.arrayElement(userRows);

      comments.push({
        postId: post.id,
        userId: randomUser.id,
        content: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  await queryInterface.bulkInsert("Comments", comments, {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Comments", null, {});
}
