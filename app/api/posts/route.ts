import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'data/posts.json');

function getPosts() {
  const fileContent = fs.readFileSync(postsFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

function savePosts(posts: any) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const posts = getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    const posts = getPosts();
    
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      })
    };
    
    posts.unshift(postWithId);
    savePosts(posts);
    return NextResponse.json(postWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPost = await request.json();
    const posts = getPosts();
    const index = posts.findIndex((p: any) => p.id === updatedPost.id);
    
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedPost };
      savePosts(posts);
      return NextResponse.json(posts[index]);
    }
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    let posts = getPosts();
    posts = posts.filter((p: any) => p.id !== id);
    savePosts(posts);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
