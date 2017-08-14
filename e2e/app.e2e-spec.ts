import { LaravelTaskPage } from './app.po';

describe('laravel-task App', () => {
  let page: LaravelTaskPage;

  beforeEach(() => {
    page = new LaravelTaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
