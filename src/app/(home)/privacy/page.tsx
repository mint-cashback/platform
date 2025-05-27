import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), 'src/app/(home)/privacy/privacy.txt');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <div className="min-h-screen bg-muted/5">
      <div className="container max-w-4xl px-4 py-16 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            Privacy Policy
          </h1>
        </div>
        <div className="prose prose-lg max-w-none border dark:bg-card rounded-xl p-6">
          <pre className="whitespace-pre-wrap break-words text-foreground text-lg" style={{ fontFamily: 'inherit', background: 'none', padding: 0, margin: 0 }}>{content}</pre>
        </div>
      </div>
    </div>
  );
}