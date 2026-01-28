"use strict";
import { faker } from "@faker-js/faker";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const users = await queryInterface.sequelize.query(`SELECT id FROM "Users";`);
  const userRows = users[0];

  const posts = [];
  for (let i = 0; i < 150; i++) {
    const randomUser = faker.helpers.arrayElement(userRows);

    const blocks = [
      { type: "heading", data: faker.lorem.sentence() },
      { type: "sub-heading", data: faker.lorem.sentence() },
      {
        type: "text",
        data: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
      },
      {
        type: "image",
        data: `https://picsum.photos/1200/800?random=${faker.number.int({ min: 1, max: 10000 })}`,
      },
    ];

    posts.push({
      userId: randomUser.id,
      title: faker.lorem.sentence(),
      blocks: JSON.stringify(blocks),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await queryInterface.bulkInsert("Posts", posts, {});
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Posts", null, {});
}
