export default {
    name: 'note-video',
    props:["info"],
    template: `
      <section class="note-video">
        <div class="img-title">{{info.title}}</div>
        <br/>
        <iframe :src="info.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </section>
      `,
  };
  