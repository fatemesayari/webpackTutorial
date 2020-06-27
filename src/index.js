/*export * from './kuery';
export * from './filters';
export * from './es_query';
import fromKueryExpression from './kuery/ast/ast'*/

//import _ from 'lodash';
import { fromLegacyKueryExpression, fromKueryExpression, toElasticsearchQuery, nodeTypes } from "./kbn-es-query/src/kuery";
import {indexPattern} from "./kbn-es-query/src/__fixtures__/index_pattern_response.json";

//import { nodeTypes } from "./kbn-es-query/target/server/kuery/node_types";
//import { toElasticsearchQuery} from "@cybernetex/kbn-es-query/src/kuery/ast/ast"

//const getUserModule = () => import("./common/usersAPI");
//var kbnEsQuery = require("@cybernetex/kbn-es-query")

const btn = document.getElementById("btn");


/*const withLogFilter = connect(
  (state: State) => ({
    filterQuery: logFilterSelectors.selectLogFilterQuery(state),
    filterQueryDraft: logFilterSelectors.selectLogFilterQueryDraft(state),
    isFilterQueryDraftValid: logFilterSelectors.selectIsLogFilterQueryDraftValid(state),
  }),
  (dispatch, ownProps: WithLogFilterProps) =>
    bindPlainActionCreators({
      applyFilterQuery: (query: FilterQuery) =>
        logFilterActions.applyLogFilterQuery({
          query,
          serializedQuery: convertKueryToElasticSearchQuery(
            query.expression,
            ownProps.indexPattern
          ),
        }),
      applyFilterQueryFromKueryExpression: (expression: string) =>
        logFilterActions.applyLogFilterQuery({
          query: {
            kind: 'kuery',
            expression,
          },
          serializedQuery: convertKueryToElasticSearchQuery(expression, ownProps.indexPattern),
        }),
      setFilterQueryDraft: logFilterActions.setLogFilterQueryDraft,
      setFilterQueryDraftFromKueryExpression: (expression: string) =>
        logFilterActions.setLogFilterQueryDraft({
          kind: 'kuery',
          expression,
        }),
    })(dispatch)
);*/


btn.addEventListener("click", () => {
  var kbnQuery=document.getElementById("kbnQuery").value;

  const queries = [
    { query: /*'(extension:jpg or host:1) and not pluginId:1518'*/kbnQuery, language: 'kuery' },
   // { query: 'machine.os:osx', language: 'kuery' },
  ];

  const queryASTs = queries.map(query => {
    try {
      return fromKueryExpression(query.query, true);
    } catch (parseError) {
      try {
        fromLegacyKueryExpression(query.query);
      } catch (legacyParseError) {
        throw parseError;
      }
      throw Error('OutdatedKuerySyntaxError');
    }
  });

  const compoundQueryAST = nodeTypes.function.buildNode('and', queryASTs);
 
  var elasticQuery="";
  //console.log("lodash version ---> "+_.VERSION);
  //console.log("kbnEsQuery ---> "+JSON.stringify( kbnEsQuery));
  //console.log("kbnQuery ---> "+kbnQuery);
  //console.log("@cybernetex/kbn-es-query version ---> "+JSON.stringify(_.buildQueryFilter   (null,null)));
  elasticQuery = /*kbnQuery;*/ JSON.stringify(toElasticsearchQuery(compoundQueryAST, indexPattern));
  document.getElementById("elasticQuery").value=elasticQuery;
 // console.log(fromExpression("host:1"));
  
  //console.log(fromKueryExpression);
  /* getUserModule().then(({ getUsers }) => {
    getUsers().then(json => console.log(json));
  }); */
});