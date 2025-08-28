// data/index.js
import { questions as bl } from './business-law'
import { questions as acc } from './accountancy'
import { questions as maths } from './mathematics'
import { questions as eco } from './economics'
import { questions as sam } from './sample'

export const questionBank = {
    'accounting': acc,
    'business-laws': bl,
    'business-mathematics': maths,
    'business-economics': eco,
    'sample': sam
}
