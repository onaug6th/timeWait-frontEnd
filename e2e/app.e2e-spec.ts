import { TimeWaitPage } from './app.po';

describe('time-wait App', () => {
  let page: TimeWaitPage;

  beforeEach(() => {
    page = new TimeWaitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
