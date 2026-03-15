const CACHE_NAME = 'attendance-v1';
// 캐시할 파일들 (인터넷 없을 때 불러올 목록)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 설치 단계: 리소스를 캐시에 저장
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 인터넷 연결이 없을 때 캐시에서 파일 불러오기
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
