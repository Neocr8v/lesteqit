import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const client = await db.connect();

  try {
    // 1. Create the table if it doesn't exist
    await client.sql`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT NOT NULL,
        date TEXT NOT NULL
      );
    `;

    // 2. Import existing data from posts.json if table is empty
    const { rows } = await client.sql`SELECT COUNT(*) FROM posts;`;
    if (parseInt(rows[0].count) === 0) {
      const postsFilePath = path.join(process.cwd(), 'data/posts.json');
      const fileContent = fs.readFileSync(postsFilePath, 'utf-8');
      const posts = JSON.parse(fileContent);

      for (const post of posts) {
        await client.sql`
          INSERT INTO posts (id, title, category, author, excerpt, content, image, date)
          VALUES (${post.id}, ${post.title}, ${post.category}, ${post.author}, ${post.excerpt}, ${post.content}, ${post.image}, ${post.date});
        `;
      }
      return NextResponse.json({ message: 'Table created and data imported successfully!' });
    }

    return NextResponse.json({ message: 'Table already exists and contains data.' });
  } catch (error: any) {
    console.error('Setup DB Error:', error);
    return NextResponse.json({ 
      error: error.message, 
      stack: error.stack,
      hint: 'Check if POSTGRES_URL is set in your environment variables on Vercel.'
    }, { status: 500 });
  } finally {
    client.release();
  }
}
