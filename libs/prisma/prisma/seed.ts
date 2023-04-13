import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();

    console.log('Seeding...');




    const users = [
        {
            "email": "alice@example.com",
            "name": "Alice",
            organization: {
                name: 'LetsFlix'
            }


        },
        {
            "email": "bob@example.com",
            "name": "Bob",
            organization: {
                name: 'LetsFlix'
            }
        },
        {
            "email": "charlie@example.com",
            "name": "Charlie",
        },

        {
            "email": "doh@example.com",
            "name": "Dooooh",
            organization: {
                name: 'IwishIhadone'
            }
        }
    ]

    for await (const user of users) {

        if (user.organization) {
            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    organization: {
                        connectOrCreate: {
                            where: {
                                name: user.organization.name
                            },
                            create: {
                                name: user.organization.name
                            }
                        }
                    }

                }
            })
        } else {

            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,

                }
            })

        }

    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
