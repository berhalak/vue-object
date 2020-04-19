import { component, prop } from "@/api"

export class Info {

  @prop
  text: string;

  render(h: any) {
    return <div>
      Info is {this.text}
    </div>
  }
}
