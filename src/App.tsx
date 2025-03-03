// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Suspense } from 'react';
// import TodoApp from './components/TodoApp';
// import Background from './components/Background';
// import Loader from './components/Loader';

// function App() {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Three.js Background */}
//       <div className="absolute inset-0 z-0">
//         <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//           <Suspense fallback={null}>
//             <Background />
//           </Suspense>
//         </Canvas>
//       </div>
      
//       {/* Todo App Content */}
//       <div className="relative z-10 w-full h-full">
//         <Suspense fallback={<Loader />}>
//           <TodoApp />
//         </Suspense>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import TodoApp from './components/TodoApp';
import Background from './components/Background';
import Loader from './components/Loader';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-auto">
      {/* Three.js Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Background />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Todo App Content */}
      <div className="relative z-10 w-full">
        <Suspense fallback={<Loader />}>
          <TodoApp />
        </Suspense>
      </div>
    </div>
  );
}

export default App;