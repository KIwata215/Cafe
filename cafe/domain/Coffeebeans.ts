export type CoffeebeanDBResponse = {
  id: number;
  title: string;
  about: string;
  image_url: string;
  roast_id: number;
  sweetness: number;
  bitterness: number;
  sourness: number;
  richness: number;
  aroma: number;
  flavor_text:string;

  roast: {
    name: string;
  };
  recommeded_drink: {
    recommeded_drink_id: {
      drink_method: string;
    };
  };
  flavor: {
    flavor_id: {
      flavor_type: string;
    };
  };
  variety:{
    variety_type_id:{
      variety_type:string;
    };
  };
};

export class Coffeebeans {
  constructor(
    public id: number,
    public title: string,
    public about: string,
    public image_url: string,
    public roast_id: number,
    public sweetness: number,
    public bitterness: number,
    public sourness: number,
    public richness: number,
    public aroma: number,
    public flavor_text:string,
    public roast_level?:string,
    public recommeded_drinks?:string[],
    public variety?:string[],
    public flavors?:string[]

  ) {}
  static fromDB(data: CoffeebeanDBResponse): Coffeebeans {
    return new Coffeebeans(
      data.id,
      data.title,
      data.about,
      data.image_url,
      data.roast_id,
      data.sweetness,
      data.bitterness,
      data.sourness,
      data.richness,
      data.aroma,
      data.flavor_text,
      data.roast_level?.name,  // roast_levelはオブジェクトなので、nameを抽出
      data.recommeded_drink ? [data.recommeded_drink.recommeded_drink_id.drink_method] : undefined,
      data.flavor ? [data.flavor.flavor_id.flavor_type] : undefined
    );
  }

  
}