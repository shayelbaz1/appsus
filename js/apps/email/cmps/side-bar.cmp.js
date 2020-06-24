export default {
  template: `
    <section class='side-bar flex column align-center'>
       <router-link to='list'>
          <i class="fa fa-inbox" aria-hidden="true"></i>
       </router-link>
       <router-link to='starred'>
          <i class="fa fa-star" style="font-size:25px"></i>
       </router-link>
       <router-link to='sent'>
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
       </router-link>
       <router-link to='draft'>
          <i class="fa fa-file" aria-hidden="true"></i>
       </router-link>
       <router-link to='deleted'>
          <i class="fa fa-trash" aria-hidden="true"></i>
       </router-link>
    </section>
  `   
}