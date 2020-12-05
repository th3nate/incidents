export class MappingHelper {
  
  static mapTo<Source, Target>(source: Source): Target {
    const target: any = {};
    for (const property in source) {
      target[property] = source[property];
    }
    
    return target as Target;
  }
  
}
