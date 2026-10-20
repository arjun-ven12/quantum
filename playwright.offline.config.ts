import {defineConfig,devices} from '@playwright/test';
export default defineConfig({testDir:'./src/test',testMatch:'offline.spec.ts',use:{baseURL:'http://127.0.0.1:4174',...devices['Desktop Chrome'],viewport:{width:360,height:800},isMobile:true,hasTouch:true},webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4174',url:'http://127.0.0.1:4174',reuseExistingServer:false}});
