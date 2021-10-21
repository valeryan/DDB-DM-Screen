import { Store } from "./store";

interface Campaign extends Object {
  id: number;
  dmId: number;
  dmUsername: string;
  name: string;
  playerCount: number;
}

interface AppData extends Object {
  inviteCode: number;
  authUserId: number;
  authUserName: string;
  campaign?: Campaign;
}

class AppStore extends Store<AppData> {
  protected data(): AppData {
    return {
      inviteCode: 0,
      authUserId: 0,
      authUserName: "",
    };
  }

  setInviteCode(code: number) {
    this.state.inviteCode = code;
  }

  setAuthUser(userId: number, userName: string) {
    this.state.authUserId = userId;
    this.state.authUserName = userName;
  }

  setCampaign(campaign: Campaign) {
    this.state.campaign = campaign;
  }
}

export const appStore: AppStore = new AppStore();
