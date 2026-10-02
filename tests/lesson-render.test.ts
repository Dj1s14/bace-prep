import test from 'node:test';
import { build } from 'esbuild';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

test('every curriculum lesson renders its own content, including lessons without mastery modules', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'bace-lesson-render-'));
  const output = join(directory, 'render.cjs');
  try {
    const result = await build({
      stdin: { resolveDir: process.cwd(), loader: 'tsx', contents: `
        import React from 'react';
        import { renderToString } from 'react-dom/server';
        import assert from 'node:assert/strict';
        (async () => {
          const values = new Map();
          globalThis.localStorage = { getItem: k => values.get(k) || null, setItem: (k,v) => values.set(k,String(v)), removeItem: k => values.delete(k) };
          globalThis.window = { location: { origin: 'https://baceprep.jisd.link' }, addEventListener() {}, removeEventListener() {} };
          const { AppProvider, AppContext, useApp } = await import('./src/context/AppContext');
          const { LessonView } = await import('./src/components/student/LessonView');
          const { getMasteryLesson } = await import('./src/data/mastery');
          let fixture;
          function Capture() { fixture = useApp(); return null; }
          renderToString(<AppProvider><Capture /></AppProvider>);
          assert.ok(fixture.lessons.some(l => !getMasteryLesson(l.id)), 'Must exercise missing mastery modules');
          assert.ok(fixture.lessons.some(l => getMasteryLesson(l.id)), 'Must exercise existing mastery modules');
          const escape = text => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
          for (const lesson of fixture.lessons) {
            const html = renderToString(<AppContext.Provider value={{...fixture, selectedLessonId:lesson.id}}><LessonView /></AppContext.Provider>);
            assert.ok(html.includes(escape(lesson.title)), 'Expected the selected lesson title: '+lesson.id);
            assert.ok(html.includes('High-Yield BACE Study Sheet'), 'Expected lesson study content: '+lesson.id);
          }
          console.log('Rendered '+fixture.lessons.length+' curriculum lessons successfully.');
        })().catch(error => { console.error(error); process.exitCode = 1; });
      ` },
      bundle: true, platform: 'node', format: 'cjs', packages: 'external', write: false,
      define: { 'import.meta.env': '{}' },
      plugins: [{ name: 'test-context-access', setup(builder) {
        // Expose the private context only in this test bundle; the production API is unchanged.
        builder.onLoad({ filter: /AppContext\.tsx$/ }, args => ({ contents: readFileSync(args.path, 'utf8') + '\nexport { AppContext };', loader: 'tsx' }));
      } }],
    });
    writeFileSync(output, result.outputFiles[0].contents);
    execFileSync(process.execPath, [output], { env: { ...process.env, NODE_PATH: join(process.cwd(), 'node_modules') }, timeout: 30000, stdio: 'pipe' });
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
