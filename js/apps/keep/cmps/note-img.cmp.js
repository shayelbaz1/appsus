export default {
    name: 'note-img',
    props:["info"],
    template: `
      <section class="note-img">
        <div class="img-title">{{info.title}}</div>
        <br/>
        <img :src="info.url" alt="info.title"/>
      </section>
      `,
  };
  