'use client';

import { PressureText } from '../components/PressureText';

export default function TestPressureTextPage() {
  return (
    <div style={{ padding: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#fff' }}>
      <PressureText
        text="Interactive E2E Test"
        className="text-6xl text-black"
        minWeight={300}
        maxWeight={900}
        minWidth={50}
        maxWidth={150}
        radius={200}
      />
    </div>
  );
}
