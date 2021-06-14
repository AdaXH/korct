import { GetMapping, renderHtml } from '@/common';

export default class ViewController {
  @GetMapping(/\/*/)
  @renderHtml()
  async renderIndex(): Promise<string> {
    return 'index';
  }
}
