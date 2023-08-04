export const parseBreadcrumbs = (breadcrumbs) => {
  const parsedBreadcrumbs = [];
  for (let i = 0; i < breadcrumbs.length; i++) {
    const breadcrumb = breadcrumbs[i];
    if (i == breadcrumbs.length - 1) {
      parsedBreadcrumbs.push(breadcrumb);
    } else {
      parsedBreadcrumbs.push(<>{breadcrumb}&nbsp;-&gt;&nbsp;</>);
    }
  }
  return parsedBreadcrumbs;
};
