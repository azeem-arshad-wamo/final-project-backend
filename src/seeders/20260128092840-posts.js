"use strict";
import { faker } from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(`SELECT id from "Users";`);
  const userRows = users[0];

  const posts = [];

  for (let i = 0; i < 30; i++) {
    const randomUser = faker.helpers.arrayElement(userRows);

    // Generate realistic blocks like frontend expects
    const blocks = [
      { type: "heading", data: faker.lorem.sentence() },
      { type: "sub-heading", data: faker.lorem.sentence() },
      {
        type: "text",
        data: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
      },
      {
        type: "image",
        data: faker.image.urlPicsumPhotos({ width: 640, height: 480 }),
      },
    ];

    posts.push({
      userId: randomUser.id,
      title: faker.lorem.sentence(),
      blocks: JSON.stringify(blocks), // <- crucial fix
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert("Posts", posts, {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Posts", null, {});
}
