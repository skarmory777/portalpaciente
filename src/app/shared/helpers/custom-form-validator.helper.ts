export const requiredIfValidator = (predicate: any) => {
  return (formControl: any) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      formControl.markAsDirty();
      return { required: true };
    }
    return null;
  };
};
