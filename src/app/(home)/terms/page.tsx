import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';

export default async function TermsOfServicePage() {
  const filePath = path.join(process.cwd(), 'src/app/(home)/terms/terms.txt');
  const content = await fs.readFile(filePath, 'utf-8');

  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            Terms and Conditions
          </h1>
        </div>
        <div className="prose prose-lg max-w-none border dark:bg-card rounded-xl p-6">
          <pre className="whitespace-pre-wrap break-words text-foreground text-lg" style={{ fontFamily: 'inherit', background: 'none', padding: 0, margin: 0 }}>{content}</pre>
        </div>
      </div>
    </div>
  );
}

