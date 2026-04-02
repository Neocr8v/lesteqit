import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM posts ORDER BY date DESC;`;
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, category, author, excerpt, content, image } = await request.json();
    const id = Date.now().toString();
    const date = new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
    
    await sql`
      INSERT INTO posts (id, title, category, author, excerpt, content, image, date)
      VALUES (${id}, ${title}, ${category}, ${author}, ${excerpt}, ${content}, ${image}, ${date});
    `;
    
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    console.error('Save error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, category, author, excerpt, content, image } = await request.json();
    
    await sql`
      UPDATE posts 
      SET title = ${title}, category = ${category}, author = ${author}, 
          excerpt = ${excerpt}, content = ${content}, image = ${image}
      WHERE id = ${id};
    `;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM posts WHERE id = ${id};`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
