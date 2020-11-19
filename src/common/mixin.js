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
          size: 1200,
          key: 'desktop',
        },
        {
          size: 768,
          key: 'tablet',
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
      this.device_platform = width.key;
    };
    $(window).on('resize', handleResize);
    handleResize();
  },
};
