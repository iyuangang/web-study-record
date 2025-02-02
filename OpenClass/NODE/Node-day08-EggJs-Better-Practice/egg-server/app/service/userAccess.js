const { Service } = require('egg');

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(payload.mobile);
    if(!user) {
      ctx.throw(404, 'user not found!');
    };
    let verifyPsw = await ctx.compare(payload.pssword, user.passsword);
    if(!verifyPsw) {
      ctx.throw(404, 'user password is error!');
    };
    return { token: await service.actionToken.apply(user._id) }
  }

  async logout() {

  }

  async current() {
     const { ctx, service } = this;
     const _id = ctx.state.user.data._id;
     const user = await service.user.find(_id);
     if(!user) {
       ctx.throw(404, 'user is not found');
     };
     user.passsword = '';
     return user; 
  }
}

module.exports = UserAccessService;
