import $ from 'jquery';

export default {
  data() {
    return {
      devicePlatform: 'desktop',
    };
  },
  mounted() {
    let handleResize = () => {
      const initial = [
        {
          size: 768,
          key: 'desktop',
        },
        {
          size: 0,
          key: 'mobile',
        },
      ];
      let width = initial[0];
      for (let i = 0; i < initial.length; ++i) {
        if ($(window).width() > initial[i].size) {
          width = initial[i];
          break;
        }
      }
      this.devicePlatform = width.key;
    };
    $(window).on('resize', handleResize);
    handleResize();
  },
};
