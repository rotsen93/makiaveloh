// Main assets module - consolidates common assets
// Add your profile images here
// import profile1 from './profile1.jpg';
// import profile2 from './profile2.jpg';
// import profile3 from './profile3.jpg';
const profile1 = '';
const profile2 = '';
const profile3 = '';
import comingSoon from './coming_soon.png';


// Re-export all asset modules
export * from './stars';
export * from './project_icons';
export * from './techstack';

export const mainAssets = {
  profile1,
  profile2,
  profile3,
  comingSoon,
};

export {
  profile1,
  profile2,
  profile3,
  comingSoon,
};

export default {
  mainAssets,
};
