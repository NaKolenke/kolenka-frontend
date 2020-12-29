import JamsListPage from '@/pages/jams/JamsListPage'
import JamPage from '@/pages/jams/JamPage'
import CreateJamPage from '@/pages/jams/CreateJamPage'
import JamEntryPage from '@/pages/jams/JamEntryPage'
import EditJamEntryPage from '@/pages/jams/EditJamEntryPage'
import JamTabOverview from '@/pages/jams/JamTabOverview'
import JamTabEntries from '@/pages/jams/JamTabEntries'
import JamTabDiscussion from '@/pages/jams/JamTabDiscussion'


import JamsSidebar from '@/pages/sidebar/Jams.vue'
import JamSidebar from '@/pages/sidebar/Jam.vue'
import JamEntrySidebar from '@/pages/sidebar/JamEntry.vue'

export default [
  {
    path: '/jams/new',
    name: 'new-jam',
    components: {
      default: CreateJamPage,
    },
    props: {
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/jams/:jamUrl/edit',
    name: 'edit-jam',
    components: {
      default: CreateJamPage,
    },
    props: {
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/jams/',
    name: 'jams',
    components: {
      default: JamsListPage,
      sidebar: JamsSidebar
    }
  },
  {
    path: '/jams/:jamUrl',
    components: {
      default: JamPage,
      sidebar: JamSidebar,

    },
    children: [
      {
        path: '',
        name: 'jam',
        component: JamTabOverview
      },
      {
        path: 'entries',
        name: 'jam-entries',
        component: JamTabEntries
      },
      {
        path: 'discussion',
        name: 'jam-discussion',
        component: JamTabDiscussion
      }
    ]
  },
  {
    path: '/jams/:jamUrl/my',
    name: 'my-jam-entry',
    components: {
      default: JamEntryPage,
      sidebar: JamEntrySidebar
    }
  },
  {
    path: '/jams/:jamUrl/me/edit',
    name: 'my-jam-entry-edit',
    components: {
      default: EditJamEntryPage,
    },
    props: {
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/jams/:jamUrl/entry/:entryUrl',
    name: 'jam-entry',
    components: {
      default: JamEntryPage,
      sidebar: JamEntrySidebar
    }
  },
]
