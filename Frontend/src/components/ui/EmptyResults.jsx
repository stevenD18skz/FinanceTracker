import PropTypes from "prop-types";
import { PackageOpen, ChevronRight } from "lucide-react";

const EmptyResults = ({
  items,
  loading,
  searchQuery,
  setSearchQuery,
  onClickButton,
}) => {
  return (
    <>
      {items.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 py-12">
          {searchQuery ? (
            <>
              <PackageOpen className="h-24 w-24 text-gray-500" />
              <p className="text-gray-500">
                No goals found matching &apos;{searchQuery}&apos;
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Clear search
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <PackageOpen className="h-24 w-24 text-gray-500" />
              <p className="text-gray-500">
                No goals found for the selected filter.
              </p>
              <button
                className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                onClick={onClickButton}
              >
                Create your first goal
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

EmptyResults.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

export default EmptyResults;
