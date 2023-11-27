import { captureClick } from "./rtools";

import { TbBrandTypescript } from "react-icons/tb";
import { FaReact, FaSass, FaShopify, FaPython, FaHtml5, FaCss3, FaNpm, FaNode, FaJira, FaGithub, FaTerminal } from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import { SiRubyonrails, SiStorybook, SiJavascript, SiSqlite, SiJson, SiJsonwebtokens, SiAkamai, SiArduino, SiRaspberrypi, SiPivotaltracker, SiBlackberry } from "react-icons/si";
import { DiRuby } from "react-icons/di";

const iconMap = {
    react: {
        icon: FaReact,
        label: 'React',
        url: 'https://react.dev/'
    },
    typescript: {
        icon: TbBrandTypescript,
        label: 'Typescript',
        url: 'https://www.typescriptlang.org/'
    },
    graphql: {
        icon: GrGraphQl,
        label: 'GraphQL',
        url: 'https://graphql.org/'
    },
    sass: {
        icon: FaSass,
        label: 'Sass',
        url: 'https://sass-lang.com/'
    },
    rubyonrails: {
        icon: SiRubyonrails,
        label: 'Ruby on Rails',
        url: 'https://rubyonrails.org/'
    },
    storybookjs: {
        icon: SiStorybook,
        label: 'Storybook.js',
        url: 'https://storybook.js.org/'
    },
    polaris: {
        icon: FaShopify,
        label: 'Polaris',
        url: 'https://polaris.shopify.com/'
    },
    javascript: {
        icon: SiJavascript,
        label: 'JavaScript',
        url: 'https://ecma-international.org/publications-and-standards/standards/ecma-262/'
    },
    python: {
        icon: FaPython,
        label: 'Python',
        url: 'https://www.python.org/'
    },
    sqlite: {
        icon: SiSqlite,
        label: 'SQLite',
        url: 'https://www.sqlite.org/'
    },
    json: {
        icon: SiJson,
        label: 'JSON',
        url: 'https://www.json.org/'
    },
    html: {
        icon: FaHtml5,
        label: 'HTML',
        url: 'https://html.spec.whatwg.org/'
    },
    css: {
        icon: FaCss3,
        label: 'CSS',
        url: 'https://www.w3.org/TR/CSS/#css'
    },
    npm: {
        icon: FaNpm,
        label: 'npm',
        url: 'https://www.npmjs.com/'
    },
    node: {
        icon: FaNode,
        label: 'node',
        url: 'https://nodejs.org/'
    },
    jira: {
        icon: FaJira,
        label: 'Jira',
        url: 'https://www.atlassian.com/software/jira/'
    },
    github: {
        icon: FaGithub,
        label: 'Github',
        url: 'https://github.com/'
    },
    ais: {
        icon: SiAkamai,
        label: 'Akamai Identity Services (AIS)',
        url: 'https://www.akamai.com/products/identity-cloud'
    },
    jwt: {
        icon: SiJsonwebtokens,
        label: 'JSON Web Tokens (JWT)',
        url: 'https://jwt.io/'
    },
    shell: {
        icon: FaTerminal,
        label: 'Shell scripting',
        url: 'https://en.wikipedia.org/wiki/Shell_script'
    },
    arduino: {
        icon: SiArduino,
        label: 'Arduino',
        url: 'https://www.arduino.cc/'
    },
    raspberrypi: {
        icon: SiRaspberrypi,
        label: 'Raspberry Pi',
        url: 'https://www.raspberrypi.com/'
    },
    ruby: {
        icon: DiRuby,
        label: 'Ruby',
        url: 'https://www.ruby-lang.org/'
    },
    pivotaltracker: {
        icon: SiPivotaltracker,
        label: 'Pivotal Tracker',
        url: 'https://www.pivotaltracker.com/'
    },
    blackberry: {
        icon: SiBlackberry,
        label: 'BlackBerry',
        url: 'https://www.blackberry.com/'
    },
}

const buildIcons = (icons) => {
    return icons.map((iconObj, index) => {
        if (iconObj in iconMap) {
            const Icon = iconMap[iconObj]['icon'];
            const label = iconMap[iconObj]['label'];
            const url = iconMap[iconObj]['url']
            return (
                <div key={index} className='inline-block text-2xl'>
                    <a href={url} target="_blank" title={label} onClick={() => {
                        captureClick({ label, url });
                    }}
                        rel="noreferrer"><Icon /></a>
                </div>
            )
        }
    })
}

export default function IconString({ data }) {
    return (<div className='icons block'>
        {buildIcons(data)}
    </div>)
}